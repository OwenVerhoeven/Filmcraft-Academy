import { Navigate, Route, Routes } from "./router";
import { Shell } from "./components/Shell";
import {
  Achievements,
  Character,
  Codex,
  Completion,
  Dashboard,
  FinalBoss,
  Portfolio,
  Quests,
  SettingsView,
  SkillView,
} from "./pages";
import { TalentTree, TalentTreeOverview } from "./TalentTrees";
import { useAuth } from "./auth";
import { Login } from "./Login";

export function App() {
  const { user } = useAuth();
  if (!user) return <Login />;
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/talent-trees" element={<TalentTreeOverview />} />
        <Route path="/talent-tree/:id" element={<TalentTree />} />
        <Route path="/worlds" element={<TalentTreeOverview />} />
        <Route path="/world/:id" element={<TalentTree />} />
        <Route path="/skill/:id" element={<SkillView />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/character" element={<Character />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/codex" element={<Codex />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/final-boss" element={<FinalBoss />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Shell>
  );
}
