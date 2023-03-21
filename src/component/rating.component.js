export default function Rating(props) {
    const { rate } = props;

    const yellowStar = <svg class="fill-current text-yellow-500 w-4 h-4" viewBox="0 0 24 24">
    <path d="M12 17.27l-5.27 3.2 1.27-5.53L3.64 9.8l5.62-.48L12 4l2.74 5.32 5.62.48-4.36 3.14 1.27 5.53z"/>
    </svg>

    const greyStar = <svg class="fill-current text-gray-400 w-4 h-4" viewBox="0 0 24 24">
    <path d="M12 17.27l-5.27 3.2 1.27-5.53L3.64 9.8l5.62-.48L12 4l2.74 5.32 5.62.48-4.36 3.14 1.27 5.53z"/>
    </svg>

    return (
        <div class="flex items-center">
            <div class="flex mr-2">
                { //looping 5 times
                    Array(10).fill().map((_, i) => {
                        if (i < rate) {
                            return yellowStar
                        } else {
                            return greyStar
                        }
                    
                    })
                }
            </div>
            <span class="text-gray-600 text-sm">({rate}/10)</span>
        </div>

    )
}