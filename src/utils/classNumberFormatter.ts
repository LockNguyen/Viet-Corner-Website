export function generateClassTitle(index: number): string {
  return `Lớp ${index + 1}`;
}

export function parseClassNumber(title: string): number | null {
  const match = title.match(/Lớp (\d+)/);
  return match ? parseInt(match[1], 10) - 1 : null;
}