export function toBRL(value: number) {
    if (typeof value !== 'number') {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(0);
    }
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}