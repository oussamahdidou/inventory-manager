import React, { useEffect, useState } from "react";
import FluxTable from "../../Components/FluxTable/FluxTable";
import { EntreeStock, IOStock, SortieStock } from "../../helpers/declarations";
import {
  CreateEntreeStock,
  CreateSortieStock,
  GetAllIOStock,
} from "../../api/api";
import SuccessDialog from "../../Components/SuccessDialog/SuccessDialog";
import ErrorDialog from "../../Components/ErrorDialog/ErrorDialog";
import AddEntreeStockModal, {
  AddEntreeStockDto,
} from "../../Components/AddEntreeStockModal/AddEntreeStockModal";
import AddSortieStockModal, {
  AddSortieStockDto,
} from "../../Components/AddSortieStockModal/AddSortieStockModal";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";

type Props = {};

const EntreeSortiePage = (props: Props) => {
  const EntreeToStock = (source: EntreeStock): IOStock => {
    return {
      article: source.article.nom,
      date: source.date,
      id: source.id,
      type: "Entree",
      intervenant: source.fournisseur.nom,
      quantite: source.quantite,
    };
  };
  const SortieToStock = (source: SortieStock): IOStock => {
    return {
      article: source.article.nom,
      date: source.date,
      id: source.id,
      type: "Sortie",
      intervenant: source.destination,
      quantite: source.quantite,
    };
  };
  const [ioStock, setIoStock] = useState<IOStock[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isEntreeModalOpen, setEntreeModalOpen] = useState<boolean>(false);
  const [isSortieModalOpen, setSortieModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const GetAllIoOperations = async () => {
      setLoading(true);
      const response = await GetAllIOStock();
      setIoStock(response);
      setLoading(false);
    };

    GetAllIoOperations();
  }, []);
  const CloseEntree = async (data?: AddEntreeStockDto) => {
    try {
      setEntreeModalOpen(false);
      console.log("Data:", data); // Log data to verify its content
      if (data) {
        const reponse = await CreateEntreeStock(data);

        console.log("Response:", reponse); // Log response to ensure it's valid

        if (reponse != null) {
          setIoStock(
            [...ioStock, EntreeToStock(reponse)].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          setShowSuccess(true);
        } else {
          throw new Error("Invalid response from CreateEntreeStock"); // Handle unexpected response
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error); // Log error to debug
      setEntreeModalOpen(false);
      setShowError(true);
    }
  };
  const CloseSortie = async (data?: AddSortieStockDto) => {
    try {
      setSortieModalOpen(false);
      console.log("Data:", data); // Log data to verify its content
      if (data) {
        const reponse = await CreateSortieStock(data);

        console.log("Response:", reponse); // Log response to ensure it's valid

        if (reponse != null) {
          setIoStock(
            [...ioStock, SortieToStock(reponse)].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          setShowSuccess(true);
        } else {
          throw new Error("Invalid response from CreateSortieStock"); // Handle unexpected response
        }
      } else {
      }
    } catch (error) {
      console.error("Error:", error); // Log error to debug
      setSortieModalOpen(false);
      setShowError(true);
    }
  };
  return (
    <div>
      <div>
        <div className="pt-36">
          <div className="flex justify-end gap-5 items-center py-4 container mx-auto">
            <button
              onClick={(e) => {
                setEntreeModalOpen(true);
              }}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-2 font-medium rounded"
            >
              Signaler Entree
            </button>
            <button
              onClick={(e) => {
                setSortieModalOpen(true);
              }}
              className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 font-medium rounded"
            >
              Signaler Sortie
            </button>
          </div>
          {isLoading ? (
            <TableSkeleton isLoading={isLoading}></TableSkeleton>
          ) : (
            <FluxTable iOStock={ioStock}></FluxTable>
          )}
        </div>
      </div>
      {showSuccess && (
        <SuccessDialog onClose={() => setShowSuccess(false)}></SuccessDialog>
      )}
      {showError && (
        <ErrorDialog onClose={() => setShowError(false)}></ErrorDialog>
      )}
      {isEntreeModalOpen && (
        <AddEntreeStockModal
          isOpen={isEntreeModalOpen}
          onClose={CloseEntree}
        ></AddEntreeStockModal>
      )}
      {isSortieModalOpen && (
        <AddSortieStockModal
          isOpen={isSortieModalOpen}
          onClose={CloseSortie}
        ></AddSortieStockModal>
      )}
    </div>
  );
};

export default EntreeSortiePage;
