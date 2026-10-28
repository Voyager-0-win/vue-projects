import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

/** CSV adapter: handles commas, quotes, and newlines according to CSV rules. */
export class CsvFile<T extends Record<string, string>> {
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(
    private readonly filePath: string,
    private readonly columns: (keyof T & string)[],
  ) {}

  async initialize(): Promise<void> {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await this.writeRows([]);
    }
  }

  async readRows(): Promise<T[]> {
    await this.initialize();
    const content = await fs.readFile(this.filePath, 'utf8');
    if (!content.trim()) return [];
    return parse(content, {
      columns: true,
      bom: true,
      skip_empty_lines: true,
      trim: false,
      relax_column_count: false,
    }) as T[];
  }

  /** Serialize writes within this Node process to avoid lost updates. */
  async writeRows(rows: T[]): Promise<void> {
    const operation = this.writeQueue.then(async () => {
      await fs.mkdir(path.dirname(this.filePath), { recursive: true });
      const csv = stringify(rows, { header: true, columns: this.columns });
      const tempPath = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
      try {
        await fs.writeFile(tempPath, csv, { encoding: 'utf8', flag: 'wx' });
        await fs.rename(tempPath, this.filePath);
      } catch (error) {
        await fs.rm(tempPath, { force: true }).catch(() => undefined);
        throw error;
      }
    });
    this.writeQueue = operation.catch(() => undefined);
    return operation;
  }

  /** Run read-modify-write as one serialized operation in this process. */
  async mutate<R>(mutator: (rows: T[]) => { rows: T[]; result: R } | Promise<{ rows: T[]; result: R }>): Promise<R> {
    const operation = this.writeQueue.then(async () => {
      await this.initialize();
      const content = await fs.readFile(this.filePath, 'utf8');
      const rows = content.trim()
        ? parse(content, { columns: true, bom: true, skip_empty_lines: true }) as T[]
        : [];
      const outcome = await mutator(rows);
      const csv = stringify(outcome.rows, { header: true, columns: this.columns });
      const tempPath = `${this.filePath}.${process.pid}.${Date.now()}.tmp`;
      try {
        await fs.writeFile(tempPath, csv, { encoding: 'utf8', flag: 'wx' });
        await fs.rename(tempPath, this.filePath);
      } catch (error) {
        await fs.rm(tempPath, { force: true }).catch(() => undefined);
        throw error;
      }
      return outcome.result;
    });
    this.writeQueue = operation.then(() => undefined, () => undefined);
    return operation;
  }
}
