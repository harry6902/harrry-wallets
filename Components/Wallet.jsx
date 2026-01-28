import bs58 from "bs58"
import { useState,useEffect } from "react"
import nacl from "tweetnacl";
import { generateMnemonic,mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { toast } from "react-toastify";
import { Connection,PublicKey } from "@solana/web3.js";
export function Wallet({isDark}){

    const [isSeedPhrase,setIsSeedPhrase]= useState(false);
    const [showPhrase,setShowPhrase]= useState(false);
    const [phraseArray,setPhraseArray]= useState([]);
    const [seed,setSeed]= useState("");
    const [walletCount,setWalletCount]=useState([]);
    const [wallets,setWallets]= useState([]);
    const [rotate,setRotate]=useState(false);
    const connection= new Connection("https://api.devnet.solana.com")

    const refreshBalance=async(x)=>{
        setRotate(true);

        const balance=await connection.getBalance(new PublicKey(x.publicKey));
        setWallets((prev)=>
        prev.map((item)=>
            item.id===x.id ?{...item,balance:balance/1000000000}:item
        )
    );
        setRotate(false);
        


    }
    const handleShowBalance=(x)=>{
        setWallets((prev)=>
          prev.map((item)=>
            item.id===x.id ?{...item,showBalance:true}:item
        )
    );
    }
    const copykey=async(x)=>{
       await navigator.clipboard.writeText(x);
       toast.success("Copied to Clipboard!");
    }
    const handleDeleteWallet=(x)=>{
        setWallets(
            wallets.filter((item)=> item.id!==x)
        )
        setWalletCount(
            walletCount.filter((item)=> item!==x)
        )

    }
    const handleClear =()=>{
        setWalletCount([]);
        setWallets([]);
    }
    const handleWallet=async()=>{
        let p;
        for(let i=1;i<=100;i++){
            if(!walletCount.includes(i)){
                setWalletCount([...walletCount,i]);
                p=i;
                break;
            }
        }
        const path = `m/44'/501'/${p}'/0'`
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const balance=await connection.getBalance(new PublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58()))
        setWallets([...wallets,{
            id:p,
            privatekey:secret,
            publicKey:Keypair.fromSecretKey(secret).publicKey.toBase58(),
            balance:balance/1000000000,
            showBalance:false
        }])
        
    }

    const handleCopy=async()=>{
        await navigator.clipboard.writeText(phraseArray.join(', '));

    }
    const handleGenerateSeedPhrase =()=>{
        setIsSeedPhrase(true)
        const mnemonic= generateMnemonic();
        const seed = mnemonicToSeedSync(mnemonic);
        setSeed(seed);
        setPhraseArray(mnemonic.split(" "));
    }
    const handleShowPhrase =()=>{
       
        setShowPhrase(!showPhrase);
    }
    return (
        <div className="mt-20">
            { !isSeedPhrase &&
            <div className="flex justify-between mx:0 xl:mx-[10vw]">
               <div onClick={handleGenerateSeedPhrase} className={` ${isSeedPhrase ? "pointer-events-none cursor-not-allowed opacity-50":"cursor-pointer hover:font-semibold"}
                bg-black text-white dark:bg-white dark:text-black p-3 rounded-md cursor-pointer`}>
                Generate Seed Phrase
                </div>
               <div className={`${isSeedPhrase ? "pointer-events-none cursor-not-allowed opacity-50":"cursor-pointer hover:font-semibold"}
                bg-black text-white dark:bg-white dark:text-black p-3 rounded-md cursor-pointer hover:font-semibold`}>
                Use Existing Seed Phrase</div>

            </div>
            }
            {
                isSeedPhrase  &&
                <div className="">
                    <div onClick={handleShowPhrase} className="font-bold p-3 cursor-pointer flex justify-between items-c enter border dark:bg-gray-800 border-black/30 dark:border-white/20 shadow-md rounded-md">
                        <div className="mx-[10vw] xl:mx-[2vw] text-2xl ">Seed Phrase</div>
                       {!showPhrase && <div className="mx-[10vw] xl:mx-[2vw] hover:bg-gray-200 dark:hover:bg-gray-900 p-2 cursor-pointer">∨</div>}
                       {showPhrase && <div className="mx-[10vw] xl:mx-[2vw] hover:bg-gray-200 dark:hover:bg-gray-900 p-2 cursor-pointer">∧</div>}
                    </div>

                </div>
            }
            {
                showPhrase &&
                <div className="">
                <div className="grid grid-cols-2 xl:grid-cols-4 pt-3 mx-auto gap-2">

                    {
                        phraseArray.map((ele,index)=>{
                            return (
                                <div className="text-center bg-gray-200 hover:bg-gray-100  dark:bg-gray-900 py-2 dark:hover:bg-gray-700 cursor-pointer rounded-md italic" key={index}>
                                    {ele}
                                    </div>
                            )
                        })
                    }
                     
                     </div>
                    
                     <div onClick={handleCopy} className="text-center mt-2 bg-gray-100 dark:bg-gray-900 mx-auto w-fit px-4 py-2 cursor-pointer rounded-md">
                     copy to clipboard
                    </div>
                    
                     </div>
            }
            {
                isSeedPhrase && 
                <div className="flex mt-4 justify-between items-center">
                    <div className="text-3xl font-bold ">Solana Wallet</div>
                    <div className="flex gap-3 justify-center items-center text-xs">
                        <div onClick={handleWallet}
                         className="text-white hover:font-semibold bg-black dark:text-black dark:bg-white p-2 rounded-md cursor-pointer">Add wallet</div>
                        <div onClick={handleClear} 
                        className= " bg-red-700 hover:font-semibold text-white p-2 rounded-md cursor-pointer">Clear Wallets</div>
                        </div>
                     </div>
            }

            {
                wallets.length >0 &&
                <div className="mt-5 flex flex-col gap-4  2xl:mx-0 ">

                    {
                        wallets.map((item,index)=>{
                            return(
                                <div className="border border-black/20 dark:border-white/20 p-5 rounded-md relative" key={item.id}>
                                    <div onClick={()=>{
                                            handleDeleteWallet(item.id)
                                    }}
                                     className=" absolute top-2 right-2 text-xs p-1 bg-red-700 rounded-sm hover:font-semibold cursor-pointer text-white">Delete</div>
                                     {!item.showBalance ?<div onClick={()=>{handleShowBalance(item)}} className="absolute bottom-24 right-2 p-1 bg-black text-white dark:bg-white dark:text-black cursor-pointer rounded-md text-xs">
                                            Check Balance
                                     </div>:
                                     <div className="absolute bottom-24 right-2 p-1 bg-black text-white dark:bg-white dark:text-black cursor-pointer rounded-md text-xs">
                                            <div className="flex gap-1 items-center justify-center">
                                             <div>Balance: {item.balance} Sol</div>
                                              <div onClick={()=>{
                                                refreshBalance(item)
                                              }} className={`cursor-pointer inline-block transition-transform duration-600 ease-in-out ${rotate ? "animate-spin": ""}`}>
                                             
                                             {isDark ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                               fill="none" stroke="black" stroke-width="2.5" width="20" height="20">
                                                 <path stroke-linecap="round" stroke-linejoin="round"
                                                 d="M21 12a9 9 0 11-3.5-7.1M21 3v6h-6"/>
                                                </svg>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="none" stroke="white" stroke-width="2.5" width="20" height="20">
                                                 <path stroke-linecap="round" stroke-linejoin="round"
                                                       d="M21 12a9 9 0 11-3.5-7.1M21 3v6h-6"/>
                                                </svg>


                        }
                                                </div>
                                                </div>


                                           
                                     </div>
                                    }
                                    
                                    <div className="text-2xl font-bold">Wallet{index}</div>
                                  
                                    <div className="font-bold">Public Key</div>
                                    <div onClick={()=>{
                                        copykey(item.publicKey);
                                    }} className="text-sm 2xl:text-md cursor-pointer">{item.publicKey}</div>
                                    <div className="font-bold">Private Key</div>
                                    <input onClick={()=>{
                                        copykey(item.privatekey)
                                    }} type="password" className="w-full text-sm 2xl:text-sm cursor-pointer" value={bs58.encode(item.privatekey)} />
                                   
                                    </div>
                            )
                        })
                    }
                    
                    </div>
            }
         
        </div>
    )
}