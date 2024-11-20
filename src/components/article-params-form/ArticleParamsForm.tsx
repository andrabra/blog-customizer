import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [width, setWidth] = useState(articleState.contentWidth);
	const [bgColor, setBgColor] = useState(articleState.backgroundColor);

	const aside = useRef<HTMLDivElement>(null);
	const handlerClickBtn = () => {
		return setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (aside.current && !aside.current.contains(event.target as Node)) {
			handlerClickBtn();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleButtonSubmit = (): void => {
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: width,
			fontSizeOption: fontSize,
		});
		handlerClickBtn();
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					handlerClickBtn();
				}}
			/>
			<aside
				ref={aside}
				className={
					isOpen
						? styles.container_open + ' ' + styles.container
						: styles.container
				}>
				<form className={styles.form}>
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
