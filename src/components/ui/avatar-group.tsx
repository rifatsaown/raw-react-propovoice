import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';

import { cn } from '../../lib/utils';

import type {
  CSSProperties,
  ElementRef,
  HTMLAttributes,
  ReactElement,
} from 'react';

// ================================== //

type TAvatarGroupRef = ElementRef<'div'>;
type TAvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  max?: number;
  spacing?: number;
};

type WithStyleClass = { className?: string; style?: CSSProperties };

const AvatarGroup = forwardRef<TAvatarGroupRef, TAvatarGroupProps>(
  ({ className, children, max = 1, spacing = 10, ...props }, ref) => {
    const avatarItems = Children.toArray(children).filter(
      isValidElement
    ) as ReactElement<WithStyleClass>[];

    const renderContent = useMemo(() => {
      return (
        <>
          {avatarItems.slice(0, max).map((child, index) => {
            const childProps = (child.props as unknown as WithStyleClass) || {};
            return cloneElement(child, {
              className: cn(childProps.className, 'border-2 border-background'),
              style: {
                marginLeft: index === 0 ? 0 : -spacing,
                ...(childProps.style ?? {}),
              },
            });
          })}

          {avatarItems.length > max && (
            <div
              className={cn(
                'relative flex items-center justify-center rounded-full border-2 border-background bg-muted',
                ((avatarItems[0]?.props as unknown as WithStyleClass) || {})
                  .className
              )}
              style={{ marginLeft: -spacing }}
            >
              <p>+{avatarItems.length - max}</p>
            </div>
          )}
        </>
      );
    }, [avatarItems, max, spacing]);

    return (
      <div ref={ref} className={cn('relative flex', className)} {...props}>
        {renderContent}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

// ================================== //

export { AvatarGroup };
