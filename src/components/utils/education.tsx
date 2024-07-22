export const formatNumber = (likes: string | number): string => {
  const numericLikes = typeof likes === 'string' ? parseInt(likes, 10) : likes;

  if (numericLikes >= 1000) {
    if(numericLikes <= 1099){
    return (numericLikes / 1000).toFixed(0) + "k";
}else{
    return (numericLikes / 1000).toFixed(1) + "k";
  }
}

  return numericLikes.toString();
};

export const translateFooter = (data: any, text: string) => {
  
  const foundItem = data.find((item: any) => item.name === text);

  return foundItem ? foundItem.translation : "undefined";
};
