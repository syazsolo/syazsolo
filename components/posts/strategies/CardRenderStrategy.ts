export interface CardDimensions {
  imageWidth: number;
  imageHeight: number;
  minHeight?: string;
}

export interface LineClampStrategy {
  withImage: number;
  withoutImage: number;
}

export interface CardRenderStrategy {
  name: string;
  getDimensions(): CardDimensions;
  getLineClamps(): LineClampStrategy;
  getCardClassName(): string;
  getCardContentClassName(): string;
  getPostContentWrapperClassName(hasImage: boolean): string;
  getTextWrapperClassName(hasImage: boolean): string;
  getImageWrapperClassName(hasImage: boolean): string;
  getImageClassName(): string;
}

export class VerticalCardStrategy implements CardRenderStrategy {
  name = 'vertical';

  getDimensions(): CardDimensions {
    return {
      imageWidth: 620,
      imageHeight: 300,
      minHeight: 'min-h-[460px]',
    };
  }

  getLineClamps(): LineClampStrategy {
    return {
      withImage: 3,
      withoutImage: 12,
    };
  }

  getCardClassName(): string {
    return 'bg-card border-border transition-colors h-[500px] overflow-hidden';
  }

  getCardContentClassName(): string {
    return 'p-0 h-full flex flex-col pb-3';
  }

  getPostContentWrapperClassName(hasImage: boolean): string {
    return 'px-3 mt-2 flex flex-col flex-1 min-h-0';
  }

  getTextWrapperClassName(hasImage: boolean): string {
    return hasImage ? 'mb-2' : 'flex-1';
  }

  getImageWrapperClassName(hasImage: boolean): string {
    return 'flex-1 overflow-hidden rounded-md relative min-h-0 border border-border/60 bg-muted/30 flex items-center justify-center';
  }

  getImageClassName(): string {
    return 'w-full h-full object-contain';
  }
}

export class HorizontalCardStrategy implements CardRenderStrategy {
  name = 'horizontal';

  getDimensions(): CardDimensions {
    return {
      imageWidth: 800,
      imageHeight: 400,
    };
  }

  getLineClamps(): LineClampStrategy {
    return {
      withImage: 4,
      withoutImage: 6,
    };
  }

  getImageClassName(): string {
    return 'w-full h-full object-contain';
  }

  getCardClassName(): string {
    return 'bg-card border-border transition-colors max-h-[600px] overflow-hidden';
  }

  getCardContentClassName(): string {
    return 'p-0';
  }

  getPostContentWrapperClassName(hasImage: boolean): string {
    return 'block';
  }

  getTextWrapperClassName(hasImage: boolean): string {
    const padding = hasImage ? 'px-3 mt-2' : 'px-3 mt-2 pb-3';
    return padding;
  }

  getImageWrapperClassName(hasImage: boolean): string {
    return 'overflow-hidden mt-2 mb-3 aspect-video border border-border/60 bg-muted/30 flex items-center justify-center';
  }
}
