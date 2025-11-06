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
  getImageClassName(): string;
  getCardClassName(): string;
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

  getImageClassName(): string {
    return 'w-full h-full object-cover';
  }

  getCardClassName(): string {
    return 'bg-card border-border transition-colors min-h-[460px]';
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
    return 'w-full aspect-video object-cover';
  }

  getCardClassName(): string {
    return 'bg-card border-border transition-colors';
  }
}

