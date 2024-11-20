import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
