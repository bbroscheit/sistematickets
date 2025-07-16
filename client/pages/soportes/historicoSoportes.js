import React, { useEffect, useState } from "react";
import mainStyles from "@/styles/Home.module.css";
import styles from '@/modules/historicoSoportes.module.css';
import mainStyle from "@/styles/Home.module.css";
import Card from "@/components/Card";

function HistoricoSoportes() {
  const [ soportes, setSoportes ] = useState([]);
  const [ user, setUser ] = useState(null);
  const [ filteredSoportes, setFilteredSoportes ] = useState(null);

  const [ startDate, setStartDate ] = useState('');
  const [ endDate, setEndDate ] = useState('');
  const [ userFilter, setUserFilter ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
 
  useEffect(() => {
    const userLogin = localStorage.getItem("user");
    const loginParse = JSON.parse(userLogin);
    setUser(loginParse);

    const fetchSoportes = async () => {
      const res = await fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faqFinish`);
      const data = await res.json();

      if (
          loginParse.sector === "Sistemas" || 
          loginParse.sector === "Supervisor" || 
          loginParse.sector === "Administrador"
        ) {
          setSoportes(data);
          setFilteredSoportes(data);
      } else {
          const userSoportes = data.filter(e => e.user.username === loginParse.name);
          setSoportes(userSoportes);
          setFilteredSoportes(userSoportes);
      }
    };

    fetchSoportes();
  }, []);

  useEffect(() => {
    let filtered = [ ...soportes ];
      if (userFilter) {
        const lower = userFilter.toLowerCase();
        filtered = filtered.filter(e =>
          (e.user?.username && e.user.username.toLowerCase().includes(lower)) ||
          (e.user?.firstname && e.user.firstname.toLowerCase().includes(lower)) ||
          (e.user?.lastname && e.user.lastname.toLowerCase().includes(lower))
        );
      }
      if(startDate){
        filtered = filtered.filter(e => new Date(e.created) >= new Date(startDate));
      }
      if(endDate){
        filtered = filtered.filter(e => new Date(e.created) <= new Date(endDate));
      }
      if(searchTerm){
        filtered = filtered.filter(e => e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.id.toString().includes(searchTerm) )
      }

      setFilteredSoportes(filtered);
  }, [startDate, endDate, userFilter, searchTerm, soportes]);

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setUserFilter('');
    setSearchTerm('');
  }

  //console.log(filteredSoportes);

  return (
    <div className={mainStyles.container}>
      <h1 className={mainStyles.title}>Soportes Terminados</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar por usuario"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por palabra clave o N° de soporte"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className={mainStyle.button} 
          onClick={handleClearFilters}>
            Limpiar filtros
          </button>
      </div>

      <div className={styles.gridContainer}>
        {filteredSoportes && filteredSoportes.length > 0 ? (
          filteredSoportes.map((e) => (
            <React.Fragment key={e.id}>
              <Card 
                id={e.id} 
                subject={e.subject} 
                state={e.state} 
                created={e.created} 
              />
            </React.Fragment>
          ))
        ) : <p>No se encontraron resultados.</p>}
      </div>
    </div>
  );
}

export default HistoricoSoportes;
