import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./css_modules/market.module.css"; // CSS module for styling

function Agents() {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [agents, setAgents] = useState([]);
  const [filteredagents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchagents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bymykel.github.io/CSGO-API/api/en/agents.json"
        );
        const data = await response.json();
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };

    fetchagents();
  }, []);

  if (loading) {
    return <p>Loading agents...</p>;
  }

  if (agents.length === 0) {
    return <p>No agents found.</p>;
  }

  return (
    <div>
      <div className={styles.grid}>
        {agents.map((agent) => {
          const agentName = agent.name;
          return (
            <div key={agent.id} className={styles.gridagent}>
              <img
                src={agent.image}
                alt={agentName}
                className={styles.agentImage}
              />
              <p>{agentName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Agents;
