export function contarTicketsPorWorker(tickets) {
    let conteoPorWorker = {};

    tickets.forEach(ticket => {
        const worker = ticket.worker;

        // Si el trabajador ya está en el conteo, incrementa su contador, de lo contrario, inicializa el contador en 1
        if (conteoPorWorker[worker]) {
            conteoPorWorker[worker] += 1;
        } else {
            conteoPorWorker[worker] = 1;
        }
    });

    return conteoPorWorker;
}