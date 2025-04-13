import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

interface CacheConfig {
  cacheDir: string;
  maxAge: number; // キャッシュの有効期間（秒）
}

// ディレクトリ作成のユーティリティ関数
function ensureDirSync(dirPath: string) {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw err;
    }
  }
}

class ContentCache {
  private config: CacheConfig;

  constructor(config: CacheConfig = {
    cacheDir: './src/cache/content',
    maxAge: 60 * 60 * 24 // デフォルト: 24時間
  }) {
    this.config = config;
    ensureDirSync(this.config.cacheDir);
  }

  // コンテンツのハッシュ生成
  private generateHash(content: string): string {
    return crypto
      .createHash('md5')
      .update(content)
      .digest('hex');
  }

  // キャッシュファイルのパス生成
  private getCacheFilePath(key: string): string {
    return path.join(this.config.cacheDir, `${key}.json`);
  }

  // キャッシュの保存
  saveCache(key: string, content: any): void {
    const cacheFile = this.getCacheFilePath(key);
    const cacheData = {
      timestamp: Date.now(),
      content: content
    };
    
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData), 'utf8');
  }

  // キャッシュの読み込み
  getCache(key: string): any | null {
    const cacheFile = this.getCacheFilePath(key);
    
    if (!fs.existsSync(cacheFile)) return null;

    const rawData = fs.readFileSync(cacheFile, 'utf8');
    const cacheData = JSON.parse(rawData);
    const elapsed = (Date.now() - cacheData.timestamp) / 1000;

    // キャッシュの有効期限チェック
    if (elapsed > this.config.maxAge) {
      fs.unlinkSync(cacheFile);
      return null;
    }

    return cacheData.content;
  }

  // キャッシュのクリーンアップ
  cleanupCache(): void {
    const now = Date.now();
    const files = fs.readdirSync(this.config.cacheDir);
    
    files.forEach(file => {
      const filePath = path.join(this.config.cacheDir, file);
      const stats = fs.statSync(filePath);
      const fileAge = (now - stats.mtime.getTime()) / 1000;
      
      if (fileAge > this.config.maxAge) {
        fs.unlinkSync(filePath);
      }
    });
  }
}

export default new ContentCache();