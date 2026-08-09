export function getCommentsCount(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} комментарий`;
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} комментария`;
  } else {
    return `${count} комментариев`;
  }
}

export function getRecipesCountText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'рецептов';
  }
  if (lastDigit === 1) {
    return 'рецепт';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'рецепта';
  }
  return 'рецептов';
}

export function getIngredientCountText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `ингредиентов`;
  }
  if (lastDigit === 1) {
    return `ингредиент`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `ингредиента`;
  }

  return `ингредиентов`;
}

export function formatDate(ms: number): string {
  const date = new Date(ms);
  const day = date.getDate();
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const month = monthNames[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} в ${hours}:${minutes}`;
}
