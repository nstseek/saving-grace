import { Avaliacao } from './Avaliacao';
import { Comentario } from './Comentario';
import { Empresa } from './Empresa';
import { Favorito } from './Favorito';
import { Imagem } from './Imagem';
import { Premio } from './Premio';
import { Transacao } from './Transacao';
import { Usuario } from './Usuario';

// Avaliacao relations

Usuario.hasMany(Avaliacao, {
  foreignKey: {
    allowNull: false
  }
});
Avaliacao.belongsTo(Usuario);

Empresa.hasMany(Avaliacao, {
  foreignKey: {
    allowNull: false
  }
});
Avaliacao.belongsTo(Empresa);

// Comentario relations

Comentario.hasMany(Comentario);
Comentario.belongsTo(Comentario);

Usuario.hasMany(Comentario, {
  foreignKey: {
    allowNull: false
  }
});
Comentario.belongsTo(Usuario);

Empresa.hasMany(Comentario, {
  foreignKey: {
    allowNull: false
  }
});
Comentario.belongsTo(Empresa);

// Empresa relations

Usuario.hasMany(Empresa, {
  foreignKey: {
    allowNull: false
  }
});
Empresa.belongsTo(Usuario);

// Favorito relations

Usuario.hasMany(Favorito, {
  foreignKey: {
    allowNull: false
  }
});
Favorito.belongsTo(Usuario);

Empresa.hasMany(Favorito);
Favorito.belongsTo(Empresa, {
  foreignKey: {
    allowNull: false
  }
});

// Imagem relations

Empresa.hasOne(Imagem, { onDelete: 'CASCADE'});
Imagem.belongsTo(Empresa, { onDelete: 'CASCADE'});

// Premio relations

Empresa.hasMany(Premio, {
  foreignKey: {
    allowNull: false
  }
});
Premio.belongsTo(Empresa);

Imagem.hasMany(Premio);
Premio.belongsTo(Imagem);

// Transacao relations

Usuario.hasMany(Transacao, {
  foreignKey: {
    allowNull: false
  }
});
Transacao.belongsTo(Usuario);

Empresa.hasMany(Transacao, {
  foreignKey: {
    allowNull: false
  }
});
Transacao.belongsTo(Empresa);

// Usuario relations

Imagem.hasMany(Usuario);
Usuario.belongsTo(Imagem);
