import React from 'react';
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function Notification() {
  return (
    <Popover placement="bottom-end" offset={20} showArrow backdrop="opaque">
      <PopoverTrigger>
        <div className="cursor-pointer">
          <Badge content="1" color="danger" shape="circle">
            <Icon className="text-default-500" icon="mingcute:notification-fill" height={24} width={24} />
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem]">
        <div className="p-5 ">
          <p className="font-semibold text-base">
            <b>WELCOME</b> to gokapturehub
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
