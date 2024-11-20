import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [bgColor, setBgColor] = useState(articleState.backgroundColor);
	const [width, setWidth] = useState(articleState.contentWidth);

	const aside = useRef<HTMLDivElement>(null);
	const handlerClickBtn = () => {
		return setIsMenuOpen(!isMenuOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (aside.current && !aside.current.contains(event.target as Node)) {
			handlerClickBtn();
		}
	};

	useEffect(() => {
		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	const handleButtonSubmit = (event: React.FormEvent): void => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: width,
			fontSizeOption: fontSize,
		});

		handlerClickBtn();
	};

	const handleButtonReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={(event: React.MouseEvent) => {
					event.nativeEvent.stopImmediatePropagation();
					handlerClickBtn();
				}}
			/>
			<aside
				ref={aside}
				className={
					isMenuOpen
						? styles.container_open + ' ' + styles.container
						: styles.container
				}>
				<form className={styles.form} onSubmit={handleButtonSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={(option) => setFontFamily(option)}
						title='Шрифт'
					/>
					<RadioGroup
						name={fontSize.title}
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(option) => setFontSize(option)}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(option) => setFontColor(option)}
						title='Цвет шрифта'
					/>
					<Separator></Separator>
					<Select
						selected={bgColor}
						options={backgroundColors}
						onChange={(option) => setBgColor(option)}
						title='Цвет фона'
					/>
					<Select
						selected={width}
						options={contentWidthArr}
						onChange={(option) => setWidth(option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => handleButtonReset()}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
