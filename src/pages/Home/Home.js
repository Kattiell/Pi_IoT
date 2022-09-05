import Button from '../../Components/Button/index';
import styles from './styles.module.css';


export default function Home() {

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1>atumalaca</h1>
                </div>

                <div>

                    <div>
                        <Button>
                            Home
                        </Button>

                        <Button>
                            Fale Conosco
                        </Button>

                        <Button>
                            Sobre a AgroTech
                        </Button>
                    </div>

                    <Button>
                        Cadastre-se agora
                    </Button>

                </div>
            </header>
        </div>
    );

}

{/* <Button>
Cadastre-se
</Button>

<Button>
Entrar
</Button> */}