import React, { memo } from "react";
import {
  ArticleWrapper,
  ArticleTitle,
  ArticleMeta,
  ArticleMetaElement,
} from "../styles/ArticleStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const Article = memo(function Article({ article }) {
  return (
    <ArticleWrapper data-testid="article">
      <ArticleTitle>
        <a href={article.url}>{article.title}</a>
      </ArticleTitle>
      <ArticleMeta>
        <span data-testid="article-by">
          <ArticleMetaElement color="#000">By: </ArticleMetaElement>
          {article.author ? article.author : "anonymous"}
        </span>

        <span data-testid="article-time">
          <ArticleMetaElement color="#000">Posted:</ArticleMetaElement>
          {` `}
          {dayjs(article.time).fromNow()}
        </span>
      </ArticleMeta>
    </ArticleWrapper>
  );
});
