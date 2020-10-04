import { ICacheLike } from 'axios-extensions';
import moment from 'moment';

export class HttpCacheAdapter<T> implements ICacheLike<T> {
  private readonly cache = new Map<string, T>();

  private readonly timers = new Map<string, NodeJS.Timeout>();

  constructor(
    public readonly maxAge: number,
    public readonly max: number = 15,
  ) {}

  get(key: string): T | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: T): boolean {
    if (this.cache.size > this.max || this.cache.has(key) === true) {
      return false;
    }

    const timer = setTimeout(
      this.del.bind(this),
      moment.duration(this.maxAge, 'minutes').asMilliseconds(),
      key,
    );
    this.timers.set(key, timer);
    return this.cache.set(key, value) !== undefined;
  }

  del(key: string): void {
    if (this.timers.has(key) === true) {
      const timer = this.timers.get(key);

      clearTimeout(timer);
      this.timers.delete(key);
    }
    this.cache.delete(key);
  }

  get length() {
    return this.cache.size;
  }
}
