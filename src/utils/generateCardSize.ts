function generateMainCardSize(indexHeight: number, indexWidth: number) {
  const generatedCardWidth = Math.min(indexWidth * 0.4, 200);
  const generatedCardHeight = Math.max(
    generatedCardWidth,
    Math.min(300, indexHeight * 0.3)
  );
  return { generatedCardHeight, generatedCardWidth };
}

export { generateMainCardSize };
