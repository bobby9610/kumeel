import { renderToString } from 'react-dom/server'
import App from './App'
import { initialContent, validContent, type Content } from './content'
export { initialContent, validContent }
export function render(content: Content = initialContent) { return renderToString(<App startingContent={content} />) }
