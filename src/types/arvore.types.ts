import Paisagismo from "@/app/paisagismo";

export type ArvoreCommand = {
  id?: number;
  nome: string;
  descricaoBotanica: string;
  aspectosEcologicos: string;
  regeneracaoNatural: string;
  biologiaReprodutivaCommand: BiologiaReprodutivaCommand;
  ocorrenciaNaturalCommand: OcorrenciaNaturalCommand[];
  fotoArvoreCommand: FotoArvoreCommand[] | null;
  cultivoCommand: CultivoCommand;
  paisagismoCommand: PaisagismoCommand;
};

export type AproveitamentoCommand = ComboCommand & {
  biotecnologiaCommand: BiotecnologiaCommand;
  alimentacaoCommand: AlimentacaoCommand;
  bioatividadeCommand: BioatividadeCommand;
};

export type AlimentacaoCommand = {
  id?: number;
  dadosNutricionais: string;
  formasConsumo: string;
};

export type BioatividadeCommand = ComboCommand;

export type BiologiaReprodutivaCommand = {
  id?: number;
  tipo: BiologiaReprodutivaEnum;
  descricao: string;
};

export type BiotecnologiaCommand = {
  id?: number;
  composicao: string;
  potenciaBioprodutos: string;
};

export type ComboCommand = {
  id?: number;
  descricao: string;
};

export type CuidadosEspeciaisCommand = ComboCommand & {
  tipoCuidado: TipoCuidadoEnum;
};

export type CultivoCommand = ComboCommand & {
  cuidadosEspeciaisCommand: CuidadosEspeciaisCommand[];
};

export type FotoArvoreCommand = {
  id?: number;
  fotoId: number | null;
  descricao: string;
};

export type OcorrenciaNaturalCommand = {
  id?: number;
  latitude: string;
  longitude: string;
};

export type PaisagismoCommand = ComboCommand;

export type PaisagismoFotoCommand = {
  id?: number;
  fotoId?: number;
};

export enum BiologiaReprodutivaEnum {
  FRUTIFICACAO = "Frutificação",
  DISPERCAO = "Disperção",
}

export enum TipoCuidadoEnum {
  AGUA = "Água",
  SOLO = "Solo",
}

export type ArvoreDataBase = {
  id: number;
  nome: string;
  descricao_botanica: string;
  aspectos_ecologicos: string;
  regeneracao_natural: string;
};

export type ArvoreDTO = {
  id: number;
  aproveitamento: {
    id: number;
    biotecnologia: {
      id: number;
      potenciaBioprodutos: string;
      composicao: string;
    };
    alimentacao: {
      id: number;
      dadosNutricionais: string;
      formasConsumo: string;
    };
    bioatividade: {
      id: number;
      descricao: string;
    };
    descricao: string;
  };
  nome: string;
  descricaoBotanica: string;
  aspectosEcologicos: string;
  regeneracaoNatural: string;
  ocorrenciaNatural: [
    {
      id: number;
      longitude: string;
      latitude: string;
    },
    {
      id: number;
      longitude: string;
      latitude: string;
    }
  ];
  biologiaReprodutiva: {
    id: number;
    descricao: string;
    tipo: BiologiaReprodutivaEnum;
  };
  fotoArvore: [
    {
      id: number;
      descricao: string;
      foto: {
        id: number;
      };
    }
  ];
  paisagismo: {
    id: number;
    descricao: string;
    paisagismoFoto: {
      id: number;
      foto: {
        id: number;
      };
    };
  };
  cultivo: {
    id: number;
    descricao: string;
    cuidadosEspeciais: [
      {
        id: number;
        descricao: string;
        tipoCuidado: TipoCuidadoEnum;
      }
    ];
  };
};

export type NavigationProps = {
  nomeArvore: string;
  arvoreId: string;
};

export type BiologiaReprodutivaDatabase = {
  id: number;
  tipo: BiologiaReprodutivaEnum;
  descricao: string;
  arvore_id: number;
};

export type OcorrenciaNaturalDataBase = {
  id: number;
  latitude: string;
  longitude: string;
  arvore_id: number;
};

export type FotoArvoreDataBase = {
  arvore_id: number;
  descricao: string;
  foto_id: number;
  id: number;
};

export type AproveitamentoDataBase = {
  id: number;
  descricao: string;
};
export type AlimentacaoDataBase = {
  id: number;
  dados_nutricionais: string;
  formas_consumo: string;
  aproveitamento_id: number;
};
export type BiotecnologiaDataBase = {
  id: number;
  composicao: string;
  potencia_bioprodutos: string;
  aproveitamento_id: number;
};
export type BioatividadeDataBase = {
  id: number;
  descricao: string;
  aproveitamento_id: number;
};

export type AproveitamentoDTO = {
  id: number;
  descricao: string;
  alimentacao: AlimentacaoDataBase;
  biotecnologia: BiotecnologiaDataBase;
  bioatividade: BioatividadeDataBase;
};

export type PaisagismoDataBase = {
  id: number;
  descricao: string;
  arvore_id: number;
};

export type CultivoDataBase = {
  id: number;
  descricao: string;
  arvore_id: number;
};

export type CuidadosEspeciaisDataBase = {
  id: number;
  descricao: string;
  tipo_cuidado: keyof typeof TipoCuidadoEnum;
  cultivo_id: number;
};

export type CultivoDTO = {
  descricao: string;
  cuidadosEspeciais: CuidadosEspeciaisDataBase[];
};
