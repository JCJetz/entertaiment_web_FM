export const getImagePath = (path) => {
  // Eliminar el punto inicial si existe
  const cleanPath = path.startsWith('./') ? path.slice(2) : path;
  
  // Asegurarse de que el path empiece con /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  // Combinar con PUBLIC_URL
  return `${process.env.PUBLIC_URL}${normalizedPath}`;
};

export const createImagePaths = (basePath) => ({
  trending: {
    small: process.env.PUBLIC_URL + `/assets/thumbnails/${basePath}/trending/small.jpg`,
    large: process.env.PUBLIC_URL + `/assets/thumbnails/${basePath}/trending/large.jpg`
  },
  regular: {
    small: process.env.PUBLIC_URL + `/assets/thumbnails/${basePath}/regular/small.jpg`,
    medium: process.env.PUBLIC_URL + `/assets/thumbnails/${basePath}/regular/medium.jpg`,
    large: process.env.PUBLIC_URL + `/assets/thumbnails/${basePath}/regular/large.jpg`
  }
}); 