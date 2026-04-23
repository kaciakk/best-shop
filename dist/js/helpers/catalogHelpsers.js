export function filterCatalog(products, filter) {
    let result = [...products];
    if (filter.size) {
        if (filter.size === "SL") {
            result = result.filter((item) => ["S", "M", "L"].includes(item.size));
        }
        else if (filter.size === "SMXL") {
            result = result.filter((item) => ["S", "M", "XL"].includes(item.size));
        }
        else {
            result = result.filter((item) => item.size === filter.size);
        }
    }
    if (filter.color) {
        result = result.filter((item) => item.color === filter.color);
    }
    if (filter.category) {
        result = result.filter((item) => item.category === filter.category);
    }
    if (filter.isSales) {
        result = result.filter((item) => item.salesStatus === filter.isSales);
    }
    if (filter.sort) {
        switch (filter.sort) {
            case "default":
                break;
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "popular":
                result.sort((a, b) => b.popularity - a.popularity);
                break;
        }
    }
    return result;
}
