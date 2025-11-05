import Manifesto from "../Manifesto";

export default function ManifestoExample() {
  const manifesto = `## Healthcare for All
We believe that healthcare is a fundamental right, not a privilege reserved for the wealthy. Our plan will ensure every American has access to quality, affordable healthcare without fear of bankruptcy.

## Economic Justice
Working families deserve a fair shot at the American Dream. We'll raise the minimum wage, strengthen unions, and create millions of good-paying jobs through infrastructure investment.

## Climate Action
The climate crisis demands urgent action. We'll transition to 100% clean energy by 2035, creating green jobs and protecting our planet for future generations.

## Education Investment
Every child deserves access to world-class education. We'll increase funding for public schools, make college debt-free, and invest in vocational training programs.`;

  return (
    <Manifesto
      leaderName="John Mitchell"
      manifesto={manifesto}
    />
  );
}
