import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Table } from "../components";
import { MemberGame } from "./types";

export default function AnalysisPage() {
  const [members, setMembers] = useState([]);
  const [games, setGames] = useState([]);
  const [memberGames, setMemberGames] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const membersResp = await axios.get(
        `${process.env.REACT_APP_API_URL}/members`
      );
      if (membersResp.status === 200) {
        setMembers(membersResp.data.data);
        setSelectedMember(membersResp.data.data[0]);
      }

      const gamesResp = await axios.get(
        `${process.env.REACT_APP_API_URL}/games`
      );
      if (gamesResp.status === 200) {
        setGames(gamesResp.data.data);
      }

      const memberGamesResp = await axios.get(
        `${process.env.REACT_APP_API_URL}/member_games`
      );

      if (memberGamesResp.status === 200) {
        setMemberGames(memberGamesResp.data.data);
      }
    };
    setLoading(true);
    fetchData()
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="font-bold text-4xl mt-9 mb-9 px-1">
        Data Analysis for Kids Club
      </h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-flow-row md:grid-cols-2 px-3 gap-2">
          <div>
            <h2 className="font-bold text-xl mb-2">Members</h2>

            <Table
              activeIndex={members.findIndex((m) => m === selectedMember)}
              className="w-full"
              headers={["Member", "Games Played"]}
              data={members.reduce((acc: (string | number)[][], m: string) => {
                const gamesPlayed: number = memberGames.reduce(
                  (acc: number, mg: MemberGame) =>
                    mg.member === m ? acc + 1 : acc,
                  0
                );
                acc.push([m, gamesPlayed]);
                return acc;
              }, [])}
              onRowClick={(d: any) => {
                setSelectedMember(d[0]);
              }}
            />
          </div>
          {!!selectedMember && (
            <div>
              <PieChart
                className="w-full"
                data={games.reduce((acc: any, g: string) => {
                  const total = memberGames.reduce(
                    (acc, mg: MemberGame) =>
                      mg.game === g && mg.member === selectedMember
                        ? acc + 1
                        : acc,
                    0
                  );
                  acc.push([g, total]);
                  return acc;
                }, [])}
                headers={["Sport", "Games Played"]}
                height="300px"
                title={`Games Breakdown for ${selectedMember}`}
                width="100%"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
