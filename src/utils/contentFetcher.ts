import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface ArticleContent {
  slug: string;
  content: string;
  frontmatter: {
    title: string;
    date: string;
    published?: boolean;
    'published-rioto3jp'?: boolean;
    [key: string]: any;
  };
}

// ディレクトリ作成のユーティリティ関数
function ensureDirectoryExists(directory: string) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

export async function fetchLocalMarkdownFiles(
  directory: string
): Promise<ArticleContent[]> {
  // ディレクトリが存在しない場合は作成
  ensureDirectoryExists(directory);

  const articlesDir = path.resolve(directory);
  
  // ディレクトリ内のMarkdownファイルを取得
  const markdownFiles = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md'));

  // ファイルを解析してコンテンツを抽出
  const articles: ArticleContent[] = markdownFiles.map(file => {
    const fullPath = path.join(articlesDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // gray-matterでフロントマターとコンテンツを分離
    const { data, content } = matter(fileContents);

    return {
      slug: path.basename(file, '.md'),
      content: content,
      frontmatter: {
        title: data.title || path.basename(file, '.md'),
        date: data.date || new Date().toISOString(),
        published: data.published || false,
        'published-rioto3jp': data['published-rioto3jp'] || false,
        ...data
      }
    };
  });

  return articles;
}

export async function fetchArticleContent(
  directory: string = './src/cache/articles'
): Promise<ArticleContent[]> {
  try {
    return await fetchLocalMarkdownFiles(directory);
  } catch (error) {
    console.error('コンテンツ取得中にエラーが発生:', error);
    return [];
  }
}