export function contarTicketsPorUsuario(tickets) {
    let conteoPorUsuario = {};

    tickets.forEach(ticket => {
        const username = ticket.user.username;

        // Si el usuario ya está en el conteo, incrementa su contador, de lo contrario, inicializa el contador en 1
        if (conteoPorUsuario[username]) {
            conteoPorUsuario[username] += 1;
        } else {
            conteoPorUsuario[username] = 1;
        }
    });

    return conteoPorUsuario;
}