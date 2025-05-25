export const optimizeImage = (url: string, width: number = 800): string => {
  // Unsplash URL인 경우
  if (url.includes('unsplash.com')) {
    // 이미 최적화 파라미터가 있는지 확인
    if (url.includes('?')) {
      return `${url}&w=${width}&q=75&auto=format`;
    }
    return `${url}?w=${width}&q=75&auto=format`;
  }
  
  // 로컬 이미지인 경우 (예: /map.png)
  if (url.startsWith('/')) {
    return url;
  }

  // 다른 이미지 소스에 대한 처리를 추가할 수 있습니다
  return url;
};

export const generateBlurDataURL = async (url: string): Promise<string> => {
  // 실제 프로덕션에서는 서버 사이드에서 처리하거나
  // 이미지 CDN을 사용하여 blur placeholder를 생성하는 것이 좋습니다
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1MC0yMjY2ODg2NjY4OTo+Pj42PT1ERkhISks6OUxUWFRIWEj/2wBDAR';
}; 