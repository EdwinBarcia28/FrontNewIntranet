import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "react-toastify";
import * as Icons from "lucide-react";
import { useAuthStore } from "@/store/auth";

const IconComponent = ({ iconName, size = 24, color = "black" }) => {
  const LucideIcon = Icons[iconName];
  if (!LucideIcon) {
    return <span>Ícono no encontrado</span>;
  }
  return <LucideIcon size={size} color={color} />;
};

export function NavMain({ menu = [] }) {
  const { logOut } = useAuthStore();

  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navigate = useNavigate();

  const handleClickAcceptLogout = () => {
    navigate("/");
    logOut();

    return toast.success(
      "¡Se Cerro la Sesión con Exito, Vuelva Nuevamente Pronto! 🥺",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Opciones del Menu</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            {/* <Link to={"/menu"}>
              <Icons.House />
              Inicio
            </Link> */}
          </SidebarMenuButton>
        </SidebarMenuItem>
        {menu && Array.isArray(menu) ? (
          menu.map((item) => (
            <Collapsible key={item.name} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.name}>
                    <IconComponent iconName={item.icon} />
                    <span>{item.name}</span>
                    <Icons.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.submenu.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === subItem.url}
                        >
                          <Link to={`/menu${item.url}${subItem.url}`}>
                            <span>{subItem.name}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))
        ) : (
          <p>No hay elementos en el menú</p>
        )}


        {/* <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to={"/menu/nacimiento"}>
              <Icons.Baby />
              Nacimiento
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? (
                <>
                  <Icons.Sun size={20} /> Modo Claro
                </>
              ) : (
                <>
                  <Icons.Moon size={20} /> Modo Oscuro
                </>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <AlertDialog>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <AlertDialogTrigger asChild>
                <Link>
                  <Icons.LogOut />
                  Cerrar Sesion
                </Link>
              </AlertDialogTrigger>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Deseas Cerrar Sesión?</AlertDialogTitle>
              <AlertDialogDescription>
                Estás a punto de cerrar sesión. Esto terminará tu sesión actual
                y necesitarás volver a iniciar sesión para acceder nuevamente a
                tu cuenta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleClickAcceptLogout}>
                Aceptar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarMenu>
    </SidebarGroup>
  );
}

IconComponent.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

const submenuPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })
);

const menuPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.string,
    submenu: submenuPropType,
  })
);


NavMain.propTypes = {
  menu: menuPropType.isRequired,
};


