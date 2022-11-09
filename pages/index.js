import React from 'react';
import config from '../config.json';
import styled from 'styled-components';
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/Timeline';

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState('');
    return (
        <>
            <CSSReset />
            <div>
                <Menu
                    valorDoFiltro={valorDoFiltro}
                    setValorDoFiltro={setValorDoFiltro}
                />
                <Header />
                <Timeline
                    searchValue={valorDoFiltro}
                    playlists={config.playlists}
                >
                    Conteúdo
                </Timeline>
            </div>
        </>
    );
}

export default HomePage;

const StyledHeader = styled.section`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    background-position: center top;
    height: 230px;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.banner} />
            <div className='user-info'>
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </div>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...props }) {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized =
                                        video.title.toLowerCase();
                                    const searchValuedNormalized =
                                        searchValue.toLowerCase();
                                    return titleNormalized.includes(
                                        searchValuedNormalized
                                    );
                                })
                                .map((video) => {
                                    return (
                                        <a href={video.url}>
                                            <img src={video.thumb} />
                                            <span>{video.title}</span>
                                        </a>
                                    );
                                })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
}
