import ChampMeet from "@/components/ChampMeet";
import TeamRace from "@/components/TeamRace";

const routes = [
    {path: '/', redirect: '/team-race'},
    {path: '/champions-meeting', component: ChampMeet},
    {path: '/team-race', component: TeamRace},
]

export default routes
