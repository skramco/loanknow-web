import { AppShell } from "@/components/AppShell";
import { HomeHero } from "@/components/HomeHero";

export default function HomePage() {
  return (
    <AppShell showFreePill>
      <HomeHero />
    </AppShell>
  );
}