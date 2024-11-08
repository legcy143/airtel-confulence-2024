'use client';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { cn, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';

export interface EditEventSidebarItem {
  key: string;
  title: string;
  items: {
    key: string;
    title: string;
    route: string;
    icon?: string;
  }[];
}

interface EditSectionSidebarProps {
  baseURL: string;
  eventId: string;
  items: EditEventSidebarItem[];
  isCompact: boolean;
}

export default function EditSectionSidebar({ baseURL, eventId, items, isCompact }: EditSectionSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // console.log('base url ', baseURL, ' pname ', pathname);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleRoute = (route: string, isActive: boolean) => {
    if (isActive) {
      return;
    }
    if (pathname.endsWith(route) && route.length === 0) {
      router.push(`${baseURL}/${eventId}`);
      return;
    }
    router.push(`${baseURL}/${eventId}/${route}`);
  };

  return (
    <Listbox
      itemClasses={{
        base: cn(`px-3 min-h-11 rounded-large h-[44px] p-2 opacity-80 text-xl ${isCompact && 'gap-0'}`),
        title: cn('text-small font-medium text-default-500 group-data-[selected=true]:text-foreground'),
      }}
      variant="faded"
      aria-label="Listbox menu with icons">
      {items?.map(obj => {
        return (
          <ListboxSection key={obj.key} title={isCompact ? '' : obj.title} showDivider={false}>
            {obj?.items?.map(item => {
              let isActive = pathname.endsWith(item.route) && item.route.length > 0;
              if (!isActive && pathname.endsWith(`${baseURL}/${eventId}`) && item.route.length === 0) {
                isActive = true;
              }
              return (
                <ListboxItem
                  key={item.key}
                  className={`my-1 ${isActive ? 'bg-default-100 opacity-100' : ''}`}
                  onClick={() => handleRoute(item.route, isActive)}
                  title={isCompact ? '' : item.title}
                  startContent={<Icon icon={item.icon || 'fa6-solid:plus'} />}
                />
              );
            })}
          </ListboxSection>
        );
      })}
    </Listbox>
  );
}
