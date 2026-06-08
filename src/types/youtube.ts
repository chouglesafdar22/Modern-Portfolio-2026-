export interface YoutubeVideo {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        publishedAt: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
}