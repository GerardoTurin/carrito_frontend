import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SummaryCard({ items, amount }) {
    return (
        <Card className="card" variant="elevation" elevation={8}>
            <CardContent>
                <Typography className="title" variant="h3" gutterBottom>
                    Compras
                </Typography>

                <Typography className="summary-text" color="textSecondary">
                    Total Productos : <strong className="summary-text">{items}</strong>
                </Typography>
                <Typography className="summary-text" variant="h5" gutterBottom>
                    Monto Total $ : <strong className="summary-text">${amount}</strong>
                </Typography>
                {amount > 0 && (
                    <Link className="hvr-grow about-button" to="/layout/checkout">
                        Finalizar Compra
                    </Link>
                )}
            </CardContent>
        </Card>
    );
};