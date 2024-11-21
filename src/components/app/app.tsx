import { CSSProperties, useState } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';
import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
