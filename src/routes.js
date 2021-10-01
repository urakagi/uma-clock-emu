import ChampMeet from "@/components/ChampMeet";
import TeamRace from "@/components/TeamRace";

const routes = [
    {path: '/', redirect: '/team-race'},
    {path: '/team-race', component: TeamRace},
    {path: '/champions-meeting', component: ChampMeet},
]

export default routes
