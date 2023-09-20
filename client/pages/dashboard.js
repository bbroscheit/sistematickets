// // import * as React from 'react';
// // import { useEffect} from 'react';
// // import mainStyle from '@/styles/Home.module.css';
// // import style from '@/modules/dashboard.module.css';
// // import Link from 'next/link'
// // import PropTypes from 'prop-types';
// // import { alpha } from '@mui/material/styles';
// // import Box from '@mui/material/Box';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TablePagination from '@mui/material/TablePagination';
// // import TableRow from '@mui/material/TableRow';
// // import TableSortLabel from '@mui/material/TableSortLabel';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import Paper from '@mui/material/Paper';
// // import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// // import { visuallyHidden } from '@mui/utils';

// // function createData(name, calories, fat, carbs, protein) {
// //   return {
// //     name,
// //     calories,
// //     fat,
// //     carbs,
// //     protein,
// //   };
// // }




// // // const rows = [
// // //   createData('Desarrollo1', "gisella curcio", "bernardo broscheit", "12-12-2022", "Solicitado"),
// // //   createData('Desarrollo2',"gisella curcio", "bernardo broscheit", "12-12-2022", "En progreso"),
// // //   createData('Desarrollo3', "bernardo broscheit","facundo duhalde", "12-12-2022", "Finalizado"),
// // //   createData('Desarrollo4', "bernardo broscheit", "facundo duhalde", "12-12-2022", "Cancelado"),
// // // ];

// // function descendingComparator(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) {
// //     return -1;
// //   }
// //   if (b[orderBy] > a[orderBy]) {
// //     return 1;
// //   }
// //   return 0;
// // }

// // function getComparator(order, orderBy) {
// //   return order === 'desc'
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }

// // // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // // with exampleArray.slice().sort(exampleComparator)
// // function stableSort(array, comparator) {
// //   const stabilizedThis = array.map((el, index) => [el, index]);
// //   stabilizedThis.sort((a, b) => {
// //     const order = comparator(a[0], b[0]);
// //     if (order !== 0) {
// //       return order;
// //     }
// //     return a[1] - b[1];
// //   });
// //   return stabilizedThis.map((el) => el[0]);
// // }

// // const headCells = [
// //   {
// //     id: 'name',
// //     numeric: false,
// //     disablePadding: true,
// //     label: 'Nombre',
// //   },
// //   {
// //     id: 'calories',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Solicitado',
// //   },
// //   {
// //     id: 'fat',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Desarrollador',
// //   },
// //   {
// //     id: 'carbs',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Finalizacion',
// //   },
// //   {
// //     id: 'protein',
// //     numeric: true,
// //     disablePadding: false,
// //     label: 'Estado',
// //   },
// // ];

// // function EnhancedTableHead(props) {
// //   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
// //     props;
// //   const createSortHandler = (property) => (event) => {
// //     onRequestSort(event, property);
// //   };

// //   return (
// //     <TableHead>
// //       <TableRow>
        
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             align={headCell.numeric ? 'center' : 'center'}
// //             padding={headCell.disablePadding ? 'none' : 'normal'}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             <TableSortLabel
// //               active={orderBy === headCell.id}
// //               direction={orderBy === headCell.id ? order : 'asc'}
// //               onClick={createSortHandler(headCell.id)}
// //             >
// //               {headCell.label}
// //               {orderBy === headCell.id ? (
// //                 <Box component="span" sx={visuallyHidden}>
// //                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// //                 </Box>
// //               ) : null}
// //             </TableSortLabel>
// //           </TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //   );
// // }

// // EnhancedTableHead.propTypes = {
// //   numSelected: PropTypes.number.isRequired,
// //   onRequestSort: PropTypes.func.isRequired,
// //   onSelectAllClick: PropTypes.func.isRequired,
// //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
// //   orderBy: PropTypes.string.isRequired,
// //   rowCount: PropTypes.number.isRequired,
// // };

// // function EnhancedTableToolbar(props) {
// //   const { numSelected } = props;

// //   return (
// //     <Toolbar
// //       sx={{
// //         pl: { sm: 2 },
// //         pr: { xs: 1, sm: 1 },
// //         ...(numSelected > 0 && {
// //           bgcolor: (theme) =>
// //             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
// //         }),
// //       }}
// //     >
// //      <Typography
// //           variant="h5"
// //           id="tableTitle"
// //           component="div"
// //         >
// //           Nuevo Proyecto
// //         </Typography>
// //       <Link href='/proyectos/nuevoProyecto'>
// //         <AddCircleOutlineIcon />
// //       </Link>
// //     </Toolbar>
// //   );
// // }

// // EnhancedTableToolbar.propTypes = {
// //   numSelected: PropTypes.number.isRequired,
// // };

// // export default function dashboard() {
// //   const [order, setOrder] = React.useState('asc');
// //   const [orderBy, setOrderBy] = React.useState('calories');
// //   const [selected, setSelected] = React.useState([]);
// //   const [page, setPage] = React.useState(0);
// //   const [rowsPerPage, setRowsPerPage] = React.useState(5);
// //   const [ data, setData ] = React.useState( null );

// //   let dataLength = 0;

// //   useEffect(() => {
// //     fetch("http://localhost:3001/project")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setData(data);
// //         dataLength = data.length;
// //       });
// //   }, []);

// //   const handleRequestSort = (event, property) => {
// //     const isAsc = orderBy === property && order === 'asc';
// //     setOrder(isAsc ? 'desc' : 'asc');
// //     setOrderBy(property);
// //   };

// //   const handleSelectAllClick = (event) => {
// //     if (event.target.checked) {
// //       const newSelected = rows.map((n) => n.name);
// //       setSelected(newSelected);
// //       return;
// //     }
// //     setSelected([]);
// //   };

// //   const handleClick = (event, name) => {
// //     const selectedIndex = selected.indexOf(name);
// //     let newSelected = [];

// //     if (selectedIndex === -1) {
// //       newSelected = newSelected.concat(selected, name);
// //     } else if (selectedIndex === 0) {
// //       newSelected = newSelected.concat(selected.slice(1));
// //     } else if (selectedIndex === selected.length - 1) {
// //       newSelected = newSelected.concat(selected.slice(0, -1));
// //     } else if (selectedIndex > 0) {
// //       newSelected = newSelected.concat(
// //         selected.slice(0, selectedIndex),
// //         selected.slice(selectedIndex + 1),
// //       );
// //     }

// //     setSelected(newSelected);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const isSelected = (name) => selected.indexOf(name) !== -1;

// //   // Avoid a layout jump when reaching the last page with empty rows.
// //   const emptyRows =
// //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataLength) : 0;

// //   // const visibleRows = React.useMemo(
// //   //   () =>
// //   //     stableSort(data, getComparator(order, orderBy)).slice(
// //   //       page * rowsPerPage,
// //   //       page * rowsPerPage + rowsPerPage,
// //   //     ),
// //   //   [order, orderBy, page, rowsPerPage],
// //   // );

// //   return (
// //     <div className={mainStyle.container}>
// //       <h1 className={mainStyle.title}>Proyectos</h1>
// //     <Box sx={{ width: '100%' }} className={style.Container}>
// //       <Paper sx={{ width: '100%', mb: 2 , padding:2 ,display:'flex', flexDirection:'column'}}>
// //         <EnhancedTableToolbar numSelected={selected.length} />
// //         <TableContainer>
// //           <Table
// //             sx={{ minWidth: 750 }}
// //             aria-labelledby="tableTitle"
            
// //           >
// //             <EnhancedTableHead
// //               numSelected={selected.length}
// //               order={order}
// //               orderBy={orderBy}
// //               onSelectAllClick={handleSelectAllClick}
// //               onRequestSort={handleRequestSort}
// //               rowCount={dataLength}
// //             />
// //             <TableBody>
// //               {data !== null && data.map((e, index) => {
// //                 const isItemSelected = isSelected(e.projectname);
// //                 const labelId = `enhanced-table-checkbox-${index}`;

// //                 return (
// //                   <TableRow
// //                     hover
// //                     role="checkbox"
// //                     aria-checked={isItemSelected}
// //                     tabIndex={-1}
// //                     key={e.id}
// //                     selected={isItemSelected}
// //                     sx={{ cursor: 'pointer' }}
// //                   >
// //                    <TableCell
// //                       component="th"
// //                       id={labelId}
// //                       scope="row"
// //                       padding="none"
// //                       align="center"
// //                     >
// //                       {e.projectname}
// //                     </TableCell>
// //                     <TableCell align="center">usuario</TableCell>
// //                     <TableCell align="center">usuario</TableCell>
// //                     <TableCell align="center">12-12-2022</TableCell>
// //                     <TableCell align="center">{e.state}</TableCell>
// //                   </TableRow>
// //                 );
// //               })}
              
// //               {emptyRows > 0 && (
// //                 <TableRow
// //                   style={{
// //                     height: (dense ? 33 : 53) * emptyRows,
// //                   }}
// //                 >
// //                   <TableCell colSpan={6} />
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={dataLength}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Paper>
// //     </Box>
// //     </div>
// //   );
// // }

import React from 'react'
import { useEffect, useState} from 'react';
import mainStyle from '@/styles/Home.module.css';
import style from '@/modules/dashboard.module.css';
import Link from 'next/link'
import ProjectCard from '@/components/projectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


function dashboard() {
    const [project, setProject] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/project")
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
        });
    }, []);

    console.log(project)

    return (
        <div className={mainStyle.container}>
            <h1 className={mainStyle.title}>Proyectos</h1>
            <div>
                <h5>Nuevo Proyecto</h5><Link href="proyectos/nuevoProyecto"><AddCircleOutlineIcon /></Link>
            </div>
            <hr className={style.divider}/>
            <div className={style.cardContainer}>
            {
                project !== null && project.length > 0 ? project.map( e => <ProjectCard id={e.id} state={e.state} projectName={e.projectname} projectDetail={e.projectdetail} requirer={e.users[0].firstname} worker={e.users[1].firstname} finishdate={e.finishdate} key={e.id}/>) : <h3 className={style.noproject}>Aun no has creado ningun proyecto</h3>
            }
            </div>
        </div>
    )
}

export default dashboard