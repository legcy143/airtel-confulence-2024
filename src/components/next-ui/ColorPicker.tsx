import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React, { ReactNode } from 'react'
import { ChromePicker, ColorResult } from 'react-color';

interface ColorPickerUIType {
    label?: string,
    description?: string,
    Trigger?: ReactNode,
    onChangeColor?: (newColor: ColorResult) => void;
    color: string
}


export default function ColorPickerUI({
    Trigger = <TriggerButton />,
    label = "choose color",
    description,
    onChangeColor,
    color,

}: ColorPickerUIType) {
    return (
        <div className="flex items-center mb-4 bg-default-100 justify-between font-bold p-3 rounded-lg relative">
            <div className="flex flex-col gap-1">
                <p className="text-medium capitalize">{label}</p>
                {description &&
                    <p className="text-tiny text-default-400 capitalize">{description}</p>
                }
            </div>
            <Popover backdrop="opaque" showArrow>
                <PopoverTrigger>
                    <Button style={{ backgroundColor: color }}>choose color</Button>
                </PopoverTrigger>
                <PopoverContent className=" bg-transparent backdrop-blur-0 shadow-none">
                    <ChromePicker
                        color={color}
                        onChangeComplete={onChangeColor}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}


const TriggerButton = () => (
    <Button
        variant="light"
        className="w-[50%] z-0"
    />
)