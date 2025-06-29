export type SidebarFooterProps = {
  logout: () => Promise<void>
  open: boolean;
  username: string;
}