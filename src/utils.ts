export const formatDate = (date: Date | undefined) => {
    if (date) {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        
    }
    return "N/A";

}