import PropTypes from "prop-types";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EstablishmentSwitcher({
  selectEstablishments,
}) {

  return (
    <SidebarMenu>
      <TooltipProvider>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex w-full items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-1 text-left">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                          <img
                            src="/Logo.jpeg"
                            alt="Logo"
                            className="size-4 object-contain"
                          />
                        </div>

                        <div className="grid flex-1 pl-2 text-sm leading-tight">
                          <span className="truncate font-semibold">
                            Corporacion Registro Civil 
                          </span>
                          <span className="truncate font-semibold">
                            Oficina: {selectEstablishments}
                          </span>
                        </div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                  <div className="ml-auto">
                    <ChevronsUpDown className="size-4 cursor-pointer" />
                  </div>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Establecimientos
              </DropdownMenuLabel>
              {companies.map((company) => (
                <DropdownMenuItem
                  key={company.id}
                  onClick={() => setSelectEstablishments(company)}
                  className="gap-2 p-2 text-xs"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <GalleryVerticalEnd className="size-4 shrink-0" />
                  </div>
                  {company.establecimiento}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      company.id === selectEstablishments.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent> */}
          </DropdownMenu>
        </SidebarMenuItem>
      </TooltipProvider>
    </SidebarMenu>
  );
}

const establishmentPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  idUsuario: PropTypes.number.isRequired,
  idEmpresa: PropTypes.number.isRequired,
  idDetalle: PropTypes.number.isRequired,
  puntoEmision: PropTypes.string.isRequired,
  empresa: PropTypes.string.isRequired,
  establecimiento: PropTypes.string.isRequired,
});

EstablishmentSwitcher.propTypes = {
  companies: PropTypes.arrayOf(establishmentPropType).isRequired,
  selectEstablishments: establishmentPropType.isRequired, 
  setSelectEstablishments: PropTypes.func.isRequired,
};
