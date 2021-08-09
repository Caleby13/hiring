import DividerMaterial from '@material-ui/core/Divider'

interface IDivider {
  variant?: 'fullWidth' | 'inset' | 'middle'
  light?: boolean
}

export const Divider = ({variant = 'fullWidth', light = false}: IDivider) => (
  <div style={{marginTop: '10px', marginBottom: '10px'}}>
    <DividerMaterial variant={variant} light={light} />
  </div>
)
