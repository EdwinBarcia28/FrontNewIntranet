import PropTypes from "prop-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.nombreUsuario} />
            <AvatarFallback className="rounded-lg">
              {`${user.nombreUsuario
                .charAt(0)
                .toUpperCase()}${user.nombreUsuario.charAt(1).toUpperCase()}`}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.nombreUsuario}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

NavUser.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    nombreUsuario: PropTypes.string.isRequired,
  }).isRequired,
};
