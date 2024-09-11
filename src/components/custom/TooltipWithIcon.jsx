import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from "@/components/ui/tooltip";

export const TooltipWithIcon = ({message, icon: IconComponent}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <IconComponent className="h-4 w-4"/>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
};