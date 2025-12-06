import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import {
  JavaScriptIcon,
  CssIcon,
  ReactIcon,
  TailwindIcon,
  NextIcon,
  MantineIcon,
  TypeScriptIcon,
} from "../icons";

interface IconConfig {
  id: string;
  component: React.ComponentType<{ className?: string }>;
  initialX: number; // pixels from left
  initialY: number; // pixels from top
  floatDuration: number; // seconds
  floatDistance: { x: number; y: number }; // pixels
}

interface DragState {
  isDragging: boolean;
  hasMoved: boolean;
  startX: number;
  startY: number;
  elementStartX: number;
  elementStartY: number;
}

interface FloatingTechStackProps {
  className?: string;
}

// Utility: Generate random number in range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate icon configurations with grid-based positioning
const generateIconConfigs = (): IconConfig[] => {
  const icons = [
    { id: "javascript", component: JavaScriptIcon },
    { id: "typescript", component: TypeScriptIcon },
    { id: "css", component: CssIcon },
    { id: "react", component: ReactIcon },
    { id: "tailwind", component: TailwindIcon },
    { id: "next", component: NextIcon },
    { id: "mantine", component: MantineIcon },
  ];

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Define safe zones with padding from edges
  const padding = 100; // px from edges
  const safeWidth = viewportWidth - padding * 2;
  const safeHeight = viewportHeight - padding * 2;

  // Create a 3x3 grid (we have 7 icons, some cells will be empty)
  const cols = 3;
  const rows = 3;
  const cellWidth = safeWidth / cols;
  const cellHeight = safeHeight / rows;

  // Shuffle positions to avoid predictable layout
  const positions = [
    { col: 0, row: 0 },
    { col: 1, row: 0 },
    { col: 2, row: 0 },
    { col: 0, row: 1 },
    { col: 1, row: 1 },
    { col: 2, row: 1 },
    { col: 0, row: 2 },
    { col: 1, row: 2 },
    { col: 2, row: 2 },
  ].sort(() => Math.random() - 0.5);

  return icons.map((icon, index) => {
    const pos = positions[index];

    // Calculate cell center
    const cellCenterX = padding + pos.col * cellWidth + cellWidth / 2;
    const cellCenterY = padding + pos.row * cellHeight + cellHeight / 2;

    // Add random offset within cell (±30% of cell size)
    const offsetRange = Math.min(cellWidth, cellHeight) * 0.3;
    const randomOffsetX = random(-offsetRange, offsetRange);
    const randomOffsetY = random(-offsetRange, offsetRange);

    const initialX = cellCenterX + randomOffsetX;
    const initialY = cellCenterY + randomOffsetY;

    // Responsive floating distances based on viewport size
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

    let floatDistanceX, floatDistanceY;
    if (isMobile) {
      floatDistanceX = random(20, 50);
      floatDistanceY = random(20, 50);
    } else if (isTablet) {
      floatDistanceX = random(40, 70);
      floatDistanceY = random(40, 70);
    } else {
      floatDistanceX = random(60, 100);
      floatDistanceY = random(60, 100);
    }

    return {
      id: icon.id,
      component: icon.component,
      initialX,
      initialY,
      floatDuration: random(8, 15),
      floatDistance: {
        x: floatDistanceX,
        y: floatDistanceY,
      },
    };
  });
};

export const FloatingTechStack = ({ className = "" }: FloatingTechStackProps) => {
  // Generate icon configs once on mount
  const [iconConfigs] = useState<IconConfig[]>(() => generateIconConfigs());

  // Refs for DOM elements and animation state
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());
  const floatingAnimationsMap = useRef<Map<string, gsap.core.Tween>>(new Map());
  const dragStateMap = useRef<Map<string, DragState>>(new Map());

  // Get responsive icon size
  const getIconSize = () => {
    const width = window.innerWidth;
    if (width < 768) return 48; // mobile
    if (width < 1024) return 64; // tablet
    return 80; // desktop
  };

  const [iconSize, setIconSize] = useState(getIconSize);

  // Set icon ref
  const setIconRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      iconRefsMap.current.set(id, element);
    } else {
      iconRefsMap.current.delete(id);
    }
  };

  // Clamp icon position to viewport bounds
  const clampToViewport = (x: number, y: number, size: number) => {
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  };

  // Create floating animation for an icon
  const createFloatingAnimation = (element: HTMLElement, config: IconConfig) => {
    const tween = gsap.to(element, {
      x: `+=${config.floatDistance.x}`,
      y: `+=${config.floatDistance.y}`,
      rotation: random(-15, 15),
      duration: config.floatDuration,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    return tween;
  };

  // Pointer event handlers for drag functionality
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const element = iconRefsMap.current.get(iconId);
    if (!element) return;

    // Set pointer capture for smooth dragging
    element.setPointerCapture(e.pointerId);

    // Get current position from GSAP
    const currentX = gsap.getProperty(element, "x") as number;
    const currentY = gsap.getProperty(element, "y") as number;

    // Store drag state (don't pause animation yet - only on actual movement)
    dragStateMap.current.set(iconId, {
      isDragging: true,
      hasMoved: false,
      startX: e.clientX,
      startY: e.clientY,
      elementStartX: currentX,
      elementStartY: currentY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, iconId: string) => {
    const dragState = dragStateMap.current.get(iconId);
    if (!dragState || !dragState.isDragging) return;

    const element = iconRefsMap.current.get(iconId);
    if (!element) return;

    // Calculate movement distance from start
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Threshold: only treat as drag if moved more than 5 pixels
    if (!dragState.hasMoved && distance < 5) {
      return;
    }

    // Mark as moved once threshold is exceeded - kill animation for clean control
    if (!dragState.hasMoved) {
      // Kill the floating animation to take full control
      const floatingAnim = floatingAnimationsMap.current.get(iconId);
      if (floatingAnim) {
        floatingAnim.kill();
      }

      // Get the ACTUAL current position after killing animation
      const currentX = gsap.getProperty(element, "x") as number;
      const currentY = gsap.getProperty(element, "y") as number;

      // Update drag state - keep original start position, update element position to current
      dragStateMap.current.set(iconId, {
        ...dragState,
        hasMoved: true,
        elementStartX: currentX,
        elementStartY: currentY,
      });

      // Visual feedback - scale up
      gsap.to(element, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
      });

      // Don't exit - continue with drag calculation below using updated state
    }

    // Get the current drag state (might have been updated above)
    const currentDragState = dragStateMap.current.get(iconId);
    if (!currentDragState) return;

    // Calculate new position from the original mouse start position
    const newDeltaX = e.clientX - currentDragState.startX;
    const newDeltaY = e.clientY - currentDragState.startY;
    const newX = currentDragState.elementStartX + newDeltaX;
    const newY = currentDragState.elementStartY + newDeltaY;

    // Clamp to viewport bounds
    const clamped = clampToViewport(newX, newY, iconSize);

    // Directly set position - no animations during drag
    gsap.set(element, {
      x: clamped.x,
      y: clamped.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, iconId: string) => {
    const dragState = dragStateMap.current.get(iconId);
    if (!dragState) return;

    const element = iconRefsMap.current.get(iconId);
    if (!element) return;

    // Release pointer capture
    element.releasePointerCapture(e.pointerId);

    // Update drag state
    dragStateMap.current.set(iconId, {
      ...dragState,
      isDragging: false,
    });

    // Only recreate animation if the icon was actually dragged
    if (dragState.hasMoved) {
      // Visual feedback - scale back to normal
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });

      // Kill old floating animation and create a new one from current position
      setTimeout(() => {
        const oldAnim = floatingAnimationsMap.current.get(iconId);
        if (oldAnim) {
          oldAnim.kill();
        }

        // Get the icon config to use the same float parameters
        const config = iconConfigs.find((c) => c.id === iconId);
        if (config) {
          // Create new floating animation from current position
          const newAnim = createFloatingAnimation(element, config);
          floatingAnimationsMap.current.set(iconId, newAnim);
        }
      }, 500);
    }
    // If not moved, do nothing - animation continues uninterrupted
  };

  // Initialize animations
  useGSAP(() => {
    const iconElements = Array.from(iconRefsMap.current.entries());

    // Set initial positions
    iconElements.forEach(([id, element]) => {
      const config = iconConfigs.find((c) => c.id === id);
      if (!config) return;

      gsap.set(element, {
        x: config.initialX,
        y: config.initialY,
        opacity: 0,
        scale: 0.3,
      });
    });

    // Entrance animation
    gsap.to(
      iconElements.map(([, el]) => el),
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
        onComplete: () => {
          // Start floating animations after entrance
          iconElements.forEach(([id, element]) => {
            const config = iconConfigs.find((c) => c.id === id);
            if (!config) return;

            const floatingAnim = createFloatingAnimation(element, config);
            floatingAnimationsMap.current.set(id, floatingAnim);
          });
        },
      }
    );
  }, [iconConfigs]);

  // Handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      const newIconSize = getIconSize();
      setIconSize(newIconSize);

      // Re-clamp all icon positions to new viewport bounds
      iconRefsMap.current.forEach((element, iconId) => {
        const currentX = gsap.getProperty(element, "x") as number;
        const currentY = gsap.getProperty(element, "y") as number;

        const clamped = clampToViewport(currentX, currentY, newIconSize);

        gsap.to(element, {
          x: clamped.x,
          y: clamped.y,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      floatingAnimationsMap.current.forEach((tween) => tween.kill());
      floatingAnimationsMap.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[5] pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {iconConfigs.map((config) => {
        const IconComponent = config.component;
        return (
          <div
            key={config.id}
            ref={(el) => setIconRef(config.id, el)}
            onPointerDown={(e) => handlePointerDown(e, config.id)}
            onPointerMove={(e) => handlePointerMove(e, config.id)}
            onPointerUp={(e) => handlePointerUp(e, config.id)}
            className="absolute pointer-events-auto cursor-grab active:cursor-grabbing"
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              touchAction: "none",
              willChange: "transform",
            }}
          >
            <IconComponent className="w-full h-full opacity-60" />
          </div>
        );
      })}
    </div>
  );
};
