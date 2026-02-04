// apps/web/src/routes/__root.tsx
import Header from '@/components/Header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            // On passe une fonction qui renvoie le composant
            render: () => <TanStackRouterDevtoolsPanel />, 
          },
        ]}
      />
    </>
  ),
})